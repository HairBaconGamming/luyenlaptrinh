// --- Thuật toán 6: Duyệt BFS ---
const BFS = {
    name: "Đồ thị: Duyệt theo chiều rộng (BFS)",
    code: `void BFS(vector<vector<int>>& adj, int s) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[s] = true;
    q.push(s);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
    defaultInput: "0,1,4,0,0,0,0,8,0,4,0,8,0,0,0,0,11,0,0,8,0,7,0,4,0,0,2,0,0,0,7,0,9,14,0,0,0,0,0,9,0,10,0,0,0,0,4,14,10,0,2,0,0,0,0,0,0,2,0,1,6,8,11,0,0,0,0,1,0,7,0,0,2,0,0,0,6,7,0",
    defaultSource: 0,

    *tracer(graph, source) {
        const V = graph.length;
        const visited = new Array(V).fill(false);
        const q = [];
        visited[source] = true;
        q.push(source);
        const order = [];

        yield { graph, visited: [...visited], q: [...q], order: [...order], message: `Bắt đầu BFS từ node ${source}.`, line: 4 };

        while (q.length > 0) {
            const u = q.shift();
            order.push(u);
            yield { graph, visited: [...visited], q: [...q], order: [...order], u, message: `Xử lý node ${u}.`, line: 9 };

            for (let v = 0; v < V; v++) {
                if (graph[u][v] && !visited[v]) {
                    visited[v] = true;
                    q.push(v);
                    yield { graph, visited: [...visited], q: [...q], order: [...order], u, v, message: `Thêm node ${v} vào hàng đợi.`, line: 12 };
                }
            }
        }
        yield { graph, visited: [...visited], q: [...q], order: [...order], done: true, message: `BFS hoàn tất. Thứ tự duyệt: ${order.join(' -> ')}` };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Ma trận kề</div>
                <div id="graph-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Trạng thái duyệt</div>
                <div id="visited-container" class="vis-element-container"></div>
            </div>`;

        const graphContainer = container.querySelector('#graph-container');
        const visitedContainer = container.querySelector('#visited-container');

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

        step.visited.forEach((val, index) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val ? 'Đã duyệt' : 'Chưa';
            if (index === step.u) box.classList.add('highlight-update');
            visitedContainer.appendChild(box);
        });
    }
};
