const express = require('express');
const path = require('path');
const session = require('express-session');
const topicsData = require('./data/topics');

const app = express();
const PORT = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For parsing JSON in POST requests

// Session middleware
app.use(session({
    secret: 'algomind-secret-key', // Change in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware để cung cấp dữ liệu topics và progress cho tất cả các view
app.use((req, res, next) => {
    res.locals.topics = topicsData;
    res.locals.progress = req.session.progress || { topics: {} };
    next();
});

// Route cho trang chủ
app.get('/', (req, res) => {
    console.log('Topics for home:', res.locals.topics.filter(t => t.category === 'tham-lam').length);
    // Sửa lại trang index để tuân thủ cấu trúc mới
    res.render('index', { 
        title: 'Chào mừng đến với AlgoMind', 
        activePage: 'home' // Mặc dù không có nút home, đây là một ví dụ
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
            activePage: topic.id // Sidebar sẽ tô sáng topic này
        });
    } else {
        res.status(404).send('Không tìm thấy bài học');
    }
});

// Route cho trang mô phỏng
app.get('/visualize', (req, res) => {
    res.render('visualize', { 
        title: 'Mô phỏng Thuật toán', 
        activePage: 'visualize' // Biến này để header tô sáng đúng nút
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
    const { score } = req.body; // Score from quiz (e.g., percentage or points)

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
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
