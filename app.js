const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorConrtroller')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

// Start express app
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join( __dirname, 'views'))

// 1) Global Middleware
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set Security HTTP headers
app.use(helmet());

// Development Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!' 
});
app.use('/api',limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));


// Test middleware

// app.use((req, res, next) => {
//     console.log('Hello from the midlleware!');
//     next();
// });

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.headers);
    next();
})


// 3) ROUTES 
app.get('/', (req, res) => {
     res.status(200).render('base', {
        tour: 'The Forest Hiker',
        user: 'Sakher'
     });
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
})



app.use(globalErrorHandler)

module.exports = app;
  
