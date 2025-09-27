// --- Thuật toán 5: Thuật toán Dijkstra ---
const Dijkstra = {
    name: "Đồ thị: Thuật toán Dijkstra (Đường đi ngắn nhất)",
    code: `vector<int> dijkstra(vector<vector<int>>& graph, int src) {
    int V = graph.size();
    vector<int> dist(V, INT_MAX);
    dist[src] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, src});

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        for (int v = 0; v < V; v++) {
            if (graph[u][v] && dist[u] != INT_MAX && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
    defaultInput: "0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0",
    defaultSource: 0,

    *tracer(graph, source) {
        const V = graph.length;
        const dist = new Array(V).fill(Infinity);
        dist[source] = 0;
        const pq = [];
        pq.push([0, source]);

        yield { graph, dist: [...dist], pq: [...pq], message: `Khởi tạo khoảng cách từ nguồn ${source}.`, line: 4 };

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]); // Simple sort for priority queue
            const [cost, u] = pq.shift();
            yield { graph, dist: [...dist], pq: [...pq], u, message: `Lấy node ${u} với cost ${cost} từ hàng đợi.`, line: 8 };

            for (let v = 0; v < V; v++) {
                if (graph[u][v] && dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
                    const oldDist = dist[v];
                    dist[v] = dist[u] + graph[u][v];
                    pq.push([dist[v], v]);
                    yield { graph, dist: [...dist], pq: [...pq], u, v, updated: v, message: `Cập nhật dist[${v}] từ ${oldDist} thành ${dist[v]} qua ${u}.`, line: 11 };
                }
            }
        }
        yield { graph, dist: [...dist], done: true, message: "Thuật toán Dijkstra hoàn tất!" };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Ma trận kề</div>
                <div id="graph-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Khoảng cách (dist)</div>
                <div id="dist-container" class="vis-element-container"></div>
            </div>`;

        const graphContainer = container.querySelector('#graph-container');
        const distContainer = container.querySelector('#dist-container');

        // Render graph as 2D grid
        step.graph.forEach((row, i) => {
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.gap = '0.25rem';
            row.forEach((val, j) => {
                const box = document.createElement('div');
                box.className = 'vis-box';
                box.textContent = val === 0 || val === Infinity ? '∞' : val;
                if (i === step.u) box.classList.add('highlight-i');
                if (j === step.v) box.classList.add('highlight-j');
                rowDiv.appendChild(box);
            });
            graphContainer.appendChild(rowDiv);
        });

        // Render dist as row
        step.dist.forEach((val, index) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val === Infinity ? '∞' : val;
            if (index === step.updated) box.classList.add('highlight-update');
            distContainer.appendChild(box);
        });
    }
};
