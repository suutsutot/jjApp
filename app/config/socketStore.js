import 'app/config/userAgent';
import io from 'socket.io-client';
import config from 'app/config';

function Socket(userId) {
    // const socket = io.connect(config.server);
    const socket = io(config.server);
    socket.on('connect', function () {
        console.log('socketConnect');
        socket.emit('authenticate', {token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qbEdNRUl5T0RJelEwRTROekF6TVVaR05VVkdRa1pDUkRVeE16QTJSVGs1TmtWRU1EazNNZyJ9.eyJ2ZXJpZmllZCI6dHJ1ZSwiYXBwX21ldGFkYXRhIjp7fSwiaXNzIjoiaHR0cHM6Ly95bnBsLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1OTVlMTc3OGNjNDk3MTUyNTNkNTVkYzAiLCJhdWQiOiJCQkxwNmRUOXVnMW14WTVVSTN4d2xkNmNBM1VrbjhhSCIsImlhdCI6MTUyNTY5MjkzMywiZXhwIjoxNTI2MDUyOTMzfQ.WQl-KvwLEe1Mr6RO-O2drWcPsMVqT235xDOEKi99_CoI6y_N68o1vdB9_ZhJoMg-C7RWcOyQ9hRzOcgflV5xvlyrulU03ETPXPCKcn43nrBpGO4L5YiiUwSTeeGb9YhOP7NAIKSWPS664UmM3a4_2a8GO22DSFyGOiOWBzqsOR1EHMS-uqCZ8wGagvZ3BcE3Z8MokPWifbA9AVnVU6Bqys88kNRY2yMYvJd0X_WBvzE8naMjdUN-aBEb9JnGGMOjVyIVa_JtV0qzQQS6de3HLjInK7ujUrPliZMspRRG1gsA0QcyF8ex6nuzGNzWlc6DMGZf0JcCv03KDyosYLKNBQ'});
    });
}

export default Socket;