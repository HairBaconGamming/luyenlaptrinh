// --- Thuật toán 6: Thuật toán Bellman-Ford ---
const BellmanFord = {
    name: "Đồ thị: Thuật toán Bellman-Ford (Đường đi ngắn nhất với trọng số âm)",
    code: `vector<int> bellmanFord(vector<vector<int>>& graph, int src) {
    int V = graph.size();
    vector<int> dist(V, INT_MAX);
    dist[src] = 0;

    // Relax all edges V-1 times
    for (int i = 1; i <= V - 1; i++) {
        for (int u = 0; u < V; u++) {
            for (int v = 0; v < V; v++) {
                if (graph[u][v] != 0 && dist[u] != INT_MAX &&
                    dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }
    }

    // Check for negative weight cycle
    bool hasNegativeCycle = false;
    for (int u = 0; u < V; u++) {
        for (int v = 0; v < V; v++) {
            if (graph[u][v] != 0 && dist[u] != INT_MAX &&
                dist[u] + graph[u][v] < dist[v]) {
                hasNegativeCycle = true;
                break;
            }
        }
        if (hasNegativeCycle) break;
    }

    if (hasNegativeCycle) {
        // Handle negative cycle (e.g., set dist to indicate cycle)
        dist = vector<int>(V, INT_MIN); // or some indicator
    }

    return dist;
}`,
    defaultInput: "0,4,2,0,0,0,-3,2,0,0,0,1,0,-5,0,0",
    defaultSource: 0,

    *tracer(graph, source) {
        const V = graph.length;
        const dist = new Array(V).fill(Infinity);
        dist[source] = 0;

        yield { graph, dist: [...dist], message: `Khởi tạo khoảng cách từ nguồn ${source}.`, line: 4 };

        // Relax all edges V-1 times
        for (let iter = 1; iter <= V - 1; iter++) {
            let updated = false;
            for (let u = 0; u < V; u++) {
                for (let v = 0; v < V; v++) {
                    if (graph[u][v] !== 0 && dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
                        const oldDist = dist[v];
                        dist[v] = dist[u] + graph[u][v];
                        updated = true;
                        yield { graph, dist: [...dist], u, v, updated: v, iteration: iter, message: `Lần ${iter}: Cập nhật dist[${v}] từ ${oldDist === Infinity ? '∞' : oldDist} thành ${dist[v]} qua ${u}.`, line: 11 };
                    }
                }
            }
            if (!updated) {
                yield { graph, dist: [...dist], message: `Lần ${iter}: Không có cập nhật nào.`, line: 11 };
            }
        }

        // Check for negative cycle
        let hasNegativeCycle = false;
        for (let u = 0; u < V; u++) {
            for (let v = 0; v < V; v++) {
                if (graph[u][v] !== 0 && dist[u] !== Infinity && dist[u] + graph[u][v] < dist[v]) {
                    hasNegativeCycle = true;
                    break;
                }
            }
            if (hasNegativeCycle) break;
        }

        if (hasNegativeCycle) {
            yield { graph, dist: [...dist], negativeCycle: true, message: "Phát hiện chu trình trọng số âm!", line: 20 };
        } else {
            yield { graph, dist: [...dist], done: true, message: "Thuật toán Bellman-Ford hoàn tất, không có chu trình âm." };
        }
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
                box.textContent = val === 0 ? '0' : val;
                if (i === step.u && j === step.v) box.classList.add('highlight-edge');
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
            if (step.negativeCycle) box.classList.add('negative-cycle');
            distContainer.appendChild(box);
        });
    }
};
