// --- Thuật toán Floyd-Warshall ---
const FloydWarshall = {
    name: "Đồ thị: Thuật toán Floyd-Warshall (Đường đi ngắn nhất tất cả cặp)",
    code: `vector<vector<int>> floydWarshall(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<vector<int>> dist = graph;
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX &&
                    dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
}`,
    defaultInput: "0,3,8,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0",

    *tracer(graph) {
        const V = graph.length;
        const dist = graph.map(row => [...row]);
        // Initialize dist with Infinity where no edge
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (i !== j && dist[i][j] === 0) dist[i][j] = Infinity;
            }
        }

        yield { dist: dist.map(row => [...row]), message: `Khởi tạo ma trận khoảng cách ban đầu.`, k: -1 };

        for (let k = 0; k < V; k++) {
            yield { dist: dist.map(row => [...row]), message: `Sử dụng đỉnh ${k} làm trung gian.`, k };
            for (let i = 0; i < V; i++) {
                for (let j = 0; j < V; j++) {
                    if (dist[i][k] !== Infinity && dist[k][j] !== Infinity &&
                        dist[i][k] + dist[k][j] < dist[i][j]) {
                        const oldDist = dist[i][j];
                        dist[i][j] = dist[i][k] + dist[k][j];
                        yield { dist: dist.map(row => [...row]), i, j, k, updated: true, message: `Cập nhật dist[${i}][${j}] từ ${oldDist === Infinity ? '∞' : oldDist} thành ${dist[i][j]} qua ${k}.` };
                    }
                }
            }
        }
        yield { dist: dist.map(row => [...row]), done: true, message: "Thuật toán Floyd-Warshall hoàn tất!" };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Ma trận khoảng cách (dist)</div>
                <div id="dist-container" class="vis-element-container"></div>
            </div>`;

        const distContainer = container.querySelector('#dist-container');

        // Render dist as 2D grid
        step.dist.forEach((row, i) => {
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.gap = '0.25rem';
            row.forEach((val, j) => {
                const box = document.createElement('div');
                box.className = 'vis-box';
                box.textContent = val === Infinity ? '∞' : val;
                if (step.updated && i === step.i && j === step.j) box.classList.add('highlight-update');
                rowDiv.appendChild(box);
            });
            distContainer.appendChild(rowDiv);
        });
    }
};
