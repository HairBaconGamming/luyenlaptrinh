// --- Thuật toán 7: Duyệt DFS ---
const DFS = {
    name: "Đồ thị: Duyệt theo chiều sâu (DFS)",
    code: `void DFSUtil(vector<vector<int>>& adj, int u, vector<bool>& visited) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
        if (!visited[v]) {
            DFSUtil(adj, v, visited);
        }
    }
}

void DFS(vector<vector<int>>& adj, int s) {
    vector<bool> visited(adj.size(), false);
    DFSUtil(adj, s, visited);
}`,
    defaultInput: "0,1,4,0,0,0,0,8,0,4,0,8,0,0,0,0,11,0,0,8,0,7,0,4,0,0,2,0,0,0,7,0,9,14,0,0,0,0,0,9,0,10,0,0,0,0,4,14,10,0,2,0,0,0,0,0,0,2,0,1,6,8,11,0,0,0,0,1,0,7,0,0,2,0,0,0,6,7,0",
    defaultSource: 0,

    *tracer(graph, source) {
        const V = graph.length;
        const visited = new Array(V).fill(false);
        const stack = [];
        const order = [];

        function* dfsUtil(u) {
            visited[u] = true;
            order.push(u);
            yield { graph, visited: [...visited], stack: [...stack], order: [...order], u, message: `Duyệt node ${u}.`, line: 2 };

            for (let v = 0; v < V; v++) {
                if (graph[u][v] && !visited[v]) {
                    yield* dfsUtil(v);
                }
            }
        }

        yield* dfsUtil(source);
        yield { graph, visited: [...visited], stack: [...stack], order: [...order], done: true, message: `DFS hoàn tất. Thứ tự duyệt: ${order.join(' -> ')}` };
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
