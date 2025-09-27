document.addEventListener('DOMContentLoaded', () => {
    /**
     * =================================================================
     * PHẦN 1: ĐỊNH NGHĨA CÁC THUẬT TOÁN (TRACERS & RENDERERS)
     * =================================================================
     */

    const ALGORITHMS = {
        lis: LIS,
        quicksort: QuickSort,
        bubblesort: BubbleSort,
        mergesort: MergeSort,
        insertionsort: InsertionSort,
        selectionsort: SelectionSort,
        heapsort: HeapSort,
        countingsort: CountingSort,
        radixsort: RadixSort,
        dijkstra: Dijkstra,
        bellmanford: BellmanFord,
        floydwarshall: FloydWarshall,
        bfs: BFS,
        dfs: DFS,
        kruskal: Kruskal,
        prim: Prim,
        topologicalsort: TopologicalSort,
        scc: SCC,
        binarysearch: BinarySearch,
        linearsearch: LinearSearch,
        interpolationsearch: InterpolationSearch,
        greedy: GreedyAlgo
    };

    /**
     * =================================================================
     * PHẦN 2: ENGINE ĐIỀU KHIỂN CHÍNH
     * =================================================================
     */
    class VisualizerEngine {
        constructor() {
            // DOM Elements
            this.dom = {
                algoSelect: document.getElementById('algorithm-select'),
                arrayInput: document.getElementById('array-input'),
                nodeCount: document.getElementById('node-count'),
                graphGridContainer: document.getElementById('graph-grid-container'),
                generateGraphBtn: document.getElementById('generate-graph-btn'),
                targetInput: document.getElementById('target-input'),
                arrayRow: document.getElementById('array-row'),
                graphRow: document.getElementById('graph-row'),
                graphGridRow: document.getElementById('graph-grid-row'),
                targetRow: document.getElementById('target-row'),
                startBtn: document.getElementById('start-btn'),
                playBtn: document.getElementById('play-btn'),
                speedSlider: document.getElementById('speed-slider'),
                speedValue: document.getElementById('speed-value'),
                visualizationArea: document.getElementById('visualization-area'),
                codeDisplay: document.getElementById('code-display'),
                logMessage: document.getElementById('log-message'),
                nextBtn: document.getElementById('next-btn'),
                backBtn: document.getElementById('back-btn'),
                resetBtn: document.getElementById('reset-btn'),
                stepsList: document.getElementById('steps-list') || this.createStepsList()
            };

            // Safely initialize codeDisplay class if element exists
            if (this.dom.codeDisplay) {
                this.dom.codeDisplay.className = 'language-cpp';
            }

            this.currentAlgo = null;
            this.iterator = null;
            this.isPlaying = false;
            this.intervalId = null;
            this.speed = 1000;
            this.steps = []; // Store steps for back/next
            this.currentStepIndex = -1;
        }

        createStepsList() {
            const ul = document.createElement('ul');
            ul.id = 'steps-list';
            // Append after visualization area
            if (this.dom.visualizationArea && this.dom.visualizationArea.parentNode) {
                this.dom.visualizationArea.parentNode.insertBefore(ul, this.dom.visualizationArea.nextSibling);
            }
            return ul;
        }

        generateGrid(defaultValues = null) {
            const n = parseInt(this.dom.nodeCount.value) || 7;
            const container = this.dom.graphGridContainer;
            container.innerHTML = '';

            const grid = document.createElement('div');
            grid.className = 'graph-grid';
            grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

            for (let i = 0; i < n * n; i++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '0';
                input.value = defaultValues ? defaultValues[i] || '0' : '0';
                input.className = 'graph-input-cell';
                grid.appendChild(input);
            }

            container.appendChild(grid);
        }

        generateRandomGraph() {
            const n = parseInt(this.dom.nodeCount.value) || 7;
            const values = [];

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (i === j) {
                        values.push(0); // No self-loops
                    } else {
                        // 70% chance of edge, random weight 1-10
                        const hasEdge = Math.random() < 0.7;
                        values.push(hasEdge ? Math.floor(Math.random() * 10) + 1 : 0);
                    }
                }
            }

            this.generateGrid(values);
        }

        init() {
            // Populate algorithm select
            Object.keys(ALGORITHMS).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = ALGORITHMS[key].name;
                this.dom.algoSelect.appendChild(option);
            });

            // Set default
            this.dom.algoSelect.value = 'lis';
            this.updateInputs();

            // Initialize speed display
            if (this.dom.speedValue) {
                this.dom.speedValue.textContent = (this.speed / 1000).toFixed(1) + 's';
            }

            // Event listeners
            this.dom.algoSelect.addEventListener('change', () => this.updateInputs());
            this.dom.nodeCount.addEventListener('change', () => this.generateGrid());
            this.dom.generateGraphBtn.addEventListener('click', () => this.generateRandomGraph());
            this.dom.startBtn.addEventListener('click', () => this.runVisualization());
            this.dom.playBtn.addEventListener('click', () => this.toggleAutoRun());
            this.dom.speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value);
                if (this.dom.speedValue) {
                    this.dom.speedValue.textContent = (this.speed / 1000).toFixed(1) + 's';
                }
                if (this.isPlaying) {
                    clearInterval(this.intervalId);
                    this.intervalId = setInterval(() => this.autoNextStep(), this.speed);
                }
            });
            this.dom.nextBtn.addEventListener('click', () => this.nextStep());
            this.dom.backBtn.addEventListener('click', () => this.backStep());
            this.dom.resetBtn.addEventListener('click', () => this.reset());
        }

        updateInputs() {
            const algoKey = this.dom.algoSelect.value;
            const algo = ALGORITHMS[algoKey];
            this.currentAlgo = algo;

            // Show/hide inputs based on algo type
            const isGraphAlgo = ['dijkstra', 'bellmanford', 'floydwarshall', 'bfs', 'dfs', 'kruskal', 'prim', 'topologicalsort', 'scc'].includes(algoKey);
            const needsSource = ['dijkstra', 'bellmanford', 'bfs', 'dfs', 'prim'].includes(algoKey);
            const isSearchAlgo = ['binarysearch', 'linearsearch', 'interpolationsearch'].includes(algoKey);
            this.dom.arrayRow.style.display = isGraphAlgo ? 'none' : 'block';
            this.dom.graphRow.style.display = isGraphAlgo ? 'block' : 'none';
            this.dom.graphGridRow.style.display = isGraphAlgo ? 'block' : 'none';
            this.dom.targetRow.style.display = (needsSource || isSearchAlgo) ? 'block' : 'none';

            // Update target label if element exists
            const targetLabel = document.getElementById('target-label');
            if (targetLabel) {
                if (isSearchAlgo) {
                    targetLabel.textContent = 'Giá trị cần tìm:';
                    this.dom.targetInput.placeholder = 'Ví dụ: 7';
                } else if (needsSource) {
                    targetLabel.textContent = 'Nguồn (cho Dijkstra/Bellman-Ford/BFS/DFS/Prim):';
                    this.dom.targetInput.placeholder = 'Ví dụ: 0 (node bắt đầu)';
                }
            }

            // Set defaults
            if (isGraphAlgo) {
                const defaultGraphStr = algo.defaultInput;
                let defaultValues = null;
                if (defaultGraphStr) {
                    const values = defaultGraphStr.split(',').map(v => parseFloat(v.trim()) || 0);
                    const n = Math.sqrt(values.length);
                    if (Number.isInteger(n)) {
                        this.dom.nodeCount.value = n;
                        defaultValues = values;
                    } else {
                        this.dom.nodeCount.value = 3;
                    }
                } else {
                    this.dom.nodeCount.value = 3;
                }
                this.generateGrid(defaultValues);
                if (needsSource) {
                    this.dom.targetInput.value = algo.defaultSource || 0;
                }
            } else if (isSearchAlgo) {
                this.dom.arrayInput.value = algo.defaultInput;
                this.dom.targetInput.value = algo.defaultTarget || 7;
            } else {
                this.dom.arrayInput.value = algo.defaultInput;
            }
        }

        parseInput(algoKey) {
            const isGraphAlgo = ['dijkstra', 'bellmanford', 'floydwarshall', 'bfs', 'dfs', 'kruskal', 'prim', 'topologicalsort', 'scc'].includes(algoKey);
            const needsSource = ['dijkstra', 'bellmanford', 'bfs', 'dfs', 'prim'].includes(algoKey);
            if (isGraphAlgo) {
                const inputs = this.dom.graphGridContainer.querySelectorAll('input');
                const values = Array.from(inputs).map(inp => parseFloat(inp.value) || 0);
                const n = parseInt(this.dom.nodeCount.value) || 7;
                if (values.length !== n * n) throw new Error(`Graph input must have ${n * n} values for ${n}x${n} matrix`);
                const graph = [];
                for (let i = 0; i < n; i++) {
                    graph.push(values.slice(i * n, (i + 1) * n).map(v => v === 0 ? 0 : v));
                }
                const result = { graph };
                if (needsSource) {
                    result.source = parseInt(this.dom.targetInput.value) || 0;
                }
                return result;
            } else {
                const nums = this.dom.arrayInput.value.split(',').map(v => parseInt(v.trim())).filter(n => !isNaN(n));
                if (['binarysearch', 'linearsearch', 'interpolationsearch'].includes(algoKey)) {
                    const target = parseInt(this.dom.targetInput.value) || ALGORITHMS[algoKey].defaultTarget;
                    return { nums, target };
                }
                return { nums };
            }
        }

        runVisualization() {
            try {
                const algoKey = this.dom.algoSelect.value;
                const algo = ALGORITHMS[algoKey];
                const input = this.parseInput(algoKey);

                // Create iterator and collect all steps
                let iterator;
                if (input.source !== undefined) {
                    iterator = algo.tracer(input.graph, input.source);
                } else if (input.graph) {
                    iterator = algo.tracer(input.graph);
                } else if (input.target !== undefined) {
                    iterator = algo.tracer(input.nums, input.target);
                } else {
                    iterator = algo.tracer(input.nums);
                }

                this.steps = [];
                let step;
                while (!(step = iterator.next()).done) {
                    this.steps.push(step.value);
                }
                this.currentStepIndex = -1;

                // Clear container
                if (this.dom.visualizationArea) {
                    this.dom.visualizationArea.innerHTML = '';
                }
                if (this.dom.codeDisplay) {
                    const lines = algo.code.split('\n');
                    const highlightedLines = lines.map((line, index) => {
                        const tempCode = document.createElement('code');
                        tempCode.className = 'language-cpp';
                        tempCode.textContent = line;
                        if (typeof Prism !== 'undefined' && Prism.languages && Prism.languages.cpp) {
                            Prism.highlightElement(tempCode);
                        }
                        return `<div class="code-line" data-line="${index + 1}">${tempCode.innerHTML}</div>`;
                    }).join('');
                    this.dom.codeDisplay.innerHTML = highlightedLines;
                }
                if (this.dom.logMessage) {
                    this.dom.logMessage.textContent = 'Visualization ready. Use Next to step through.';
                }
                if (this.dom.nextBtn) this.dom.nextBtn.disabled = false;
                if (this.dom.backBtn) this.dom.backBtn.disabled = true;
                if (this.dom.startBtn) this.dom.startBtn.disabled = true;
                if (this.dom.playBtn) this.dom.playBtn.disabled = false;
                if (this.dom.speedSlider) this.dom.speedSlider.disabled = false;

                // Populate steps list
                if (this.dom.stepsList) {
                    this.dom.stepsList.innerHTML = '';
                    this.steps.forEach((step, idx) => {
                        const li = document.createElement('li');
                        li.textContent = step.message;
                        if (idx === 0) li.classList.add('current-step');
                        this.dom.stepsList.appendChild(li);
                    });
                }

            } catch (error) {
                if (this.dom.logMessage) {
                    this.dom.logMessage.textContent = `Error: ${error.message}`;
                }
            }
        }

        autoNextStep() {
            if (this.currentStepIndex < this.steps.length - 1) {
                this.nextStep();
            } else {
                this.toggleAutoRun(); // Auto-stop at end
            }
        }

        toggleAutoRun() {
            if (!this.steps.length) return;

            this.isPlaying = !this.isPlaying;

            if (this.isPlaying) {
                this.dom.playBtn.textContent = '⏸️ Dừng';
                this.intervalId = setInterval(() => this.autoNextStep(), this.speed);
                this.dom.nextBtn.disabled = true;
                this.dom.backBtn.disabled = true;
            } else {
                this.dom.playBtn.textContent = '▶️ Tự động chạy';
                clearInterval(this.intervalId);
                this.intervalId = null;
                this.dom.nextBtn.disabled = this.currentStepIndex === this.steps.length - 1;
                this.dom.backBtn.disabled = this.currentStepIndex === 0;
            }
        }

        nextStep() {
            if (this.currentStepIndex >= this.steps.length - 1) return;
            this.currentStepIndex++;
            this.renderStep(this.currentStepIndex);
            this.dom.backBtn.disabled = this.currentStepIndex === 0;
            this.dom.nextBtn.disabled = this.currentStepIndex === this.steps.length - 1;
        }

        backStep() {
            if (this.currentStepIndex <= 0) return;
            this.currentStepIndex--;
            this.renderStep(this.currentStepIndex);
            this.dom.backBtn.disabled = this.currentStepIndex === 0;
            this.dom.nextBtn.disabled = false;
        }

        renderStep(index) {
            const step = this.steps[index];
            const algoKey = this.dom.algoSelect.value;
            const algo = ALGORITHMS[algoKey];
            const input = this.parseInput(algoKey);

            // Clear and render
            this.dom.visualizationArea.innerHTML = '';
            if (algoKey === 'lis') {
                algo.renderer(step, this.dom.visualizationArea, input.nums);
            } else if (['binarysearch', 'linearsearch', 'interpolationsearch'].includes(algoKey)) {
                algo.renderer(step, this.dom.visualizationArea);
            } else if (['dijkstra', 'bellmanford', 'floydwarshall', 'bfs', 'dfs', 'kruskal', 'prim', 'topologicalsort', 'scc'].includes(algoKey)) {
                algo.renderer(step, this.dom.visualizationArea);
            } else {
                algo.renderer(step, this.dom.visualizationArea);
            }

            // Update message
            this.dom.logMessage.textContent = step.message;

            // Update steps list
            if (this.dom.stepsList) {
                const lis = this.dom.stepsList.querySelectorAll('li');
                lis.forEach((li, idx) => {
                    li.classList.toggle('current-step', idx === index);
                });
            }

            // Highlight code line if available
            if (step.line) {
                const lines = this.dom.codeDisplay.querySelectorAll('.code-line');
                const lineNumber = step.line - 1;
                lines.forEach(line => line.classList.remove('highlight-line'));
                if (lineNumber >= 0 && lineNumber < lines.length) {
                    lines[lineNumber].classList.add('highlight-line');
                }
            }
        }

        reset() {
            if (this.isPlaying) {
                this.toggleAutoRun();
            }
            this.steps = [];
            this.currentStepIndex = -1;
            this.dom.visualizationArea.innerHTML = '';
            this.dom.logMessage.textContent = 'Select an algorithm and start.';
            this.dom.nextBtn.disabled = true;
            this.dom.backBtn.disabled = true;
            this.dom.startBtn.disabled = false;
            this.dom.playBtn.disabled = true;
            this.dom.speedSlider.disabled = true;
            // Clear steps list
            if (this.dom.stepsList) {
                this.dom.stepsList.innerHTML = '';
            }
            // Clear code highlight and reset lines
            if (this.dom.codeDisplay) {
                const lines = this.dom.codeDisplay.querySelectorAll('.code-line');
                lines.forEach(line => line.classList.remove('highlight-line'));
            }
        }
    };

    // Instantiate and init
    const engine = new VisualizerEngine();
    engine.init();
});
