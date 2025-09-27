const express = require('express');
const path = require('path');
const session = require('express-session');
const topicsData = require('./data/topics');

const app = express();
const PORT = process.env.PORT || 10000; // Dùng PORT do hosting cấp hoặc fallback 10000
const isProduction = process.env.NODE_ENV === 'production';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For parsing JSON in POST requests

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'algomind-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: isProduction, // Chỉ bật khi chạy HTTPS (production)
        httpOnly: true,       // Ngăn JS đọc cookie
        maxAge: 1000 * 60 * 60 * 2 // 2h
    }
}));

// Middleware để cung cấp dữ liệu topics và progress cho tất cả các view
app.use((req, res, next) => {
    res.locals.topics = topicsData;
    res.locals.progress = req.session.progress || { topics: {} };
    next();
});

// Route cho trang chủ
app.get('/', (req, res) => {
    if (!isProduction) {
        console.log('Topics for home:', res.locals.topics.filter(t => t.category === 'tham-lam').length);
    }
    res.render('index', { 
        title: 'Chào mừng đến với AlgoMind', 
        activePage: 'home'
    });
});

// Route cho một bài học cụ thể
app.get('/topic/:id', (req, res) => {
    const topicId = req.params.id;
    const topic = topicsData.find(t => t.id === topicId);

    if (topic) {
        res.render('topic', { 
            title: topic.title, 
            topic: topic, 
            activePage: topic.id
        });
    } else {
        res.status(404).send('Không tìm thấy bài học');
    }
});

// Route cho trang mô phỏng
app.get('/visualize', (req, res) => {
    res.render('visualize', { 
        title: 'Mô phỏng Thuật toán', 
        activePage: 'visualize'
    });
});

// Route cho trang luyện tập
app.get('/practice', (req, res) => {
    res.render('practice', {
        title: 'Luyện tập',
        activePage: 'practice'
    });
});

// Route để cập nhật tiến độ hoàn thành topic
app.post('/complete-topic/:id', (req, res) => {
    const topicId = req.params.id;
    const { score } = req.body;

    if (!req.session.progress) {
        req.session.progress = { topics: {} };
    }

    req.session.progress.topics[topicId] = {
        completed: true,
        score: score || 0,
        completedAt: new Date().toISOString()
    };

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại ${isProduction ? 'https://luyenlaptrinh.onrender.com' : 'http://localhost:' + PORT}`);
});
