// --- Thuật toán: Chọn Hoạt động (Activity Selection) ---
const GreedyAlgo = {
    name: "Chọn Hoạt động (Activity Selection)",
    code: `vector<int> selectActivities(vector<pair<int, int>>& activities) {
    sort(activities.begin(), activities.end(),
         [](const pair<int, int>& a, const pair<int, int>& b) {
             return a.second < b.second;
         });
    vector<int> selected;
    int lastEnd = -1;
    for (int i = 0; i < activities.size(); i++) {
        if (activities[i].first >= lastEnd) {
            selected.push_back(i);
            lastEnd = activities[i].second;
        }
    }
    return selected;
}`,
    defaultInput: "1,3,2,4,3,5,0,6,5,7,8,9,5,9",

    *tracer(nums) {
        // Parse nums into activities: even indices start, odd end
        const activities = [];
        for (let i = 0; i < nums.length; i += 2) {
            activities.push({ start: nums[i], end: nums[i + 1], index: activities.length });
        }
        yield { activities: [...activities], message: "Danh sách hoạt động ban đầu.", line: 2 };

        // Sort by end time
        activities.sort((a, b) => a.end - b.end);
        yield { activities: [...activities], sorted: true, message: "Sắp xếp hoạt động theo thời gian kết thúc.", line: 3 };

        const selected = [];
        let lastEnd = -1;
        for (let i = 0; i < activities.length; i++) {
            const act = activities[i];
            yield { activities: [...activities], current: i, selected: [...selected], message: `Kiểm tra hoạt động ${act.index}: (${act.start}, ${act.end}). Thời gian kết thúc trước: ${lastEnd}.`, line: 8 };
            if (act.start >= lastEnd) {
                selected.push(act.index);
                lastEnd = act.end;
                yield { activities: [...activities], current: i, selected: [...selected], message: `Chọn hoạt động ${act.index} vì ${act.start} >= ${lastEnd}.`, line: 9 };
            } else {
                yield { activities: [...activities], current: i, selected: [...selected], message: `Bỏ qua hoạt động ${act.index} vì xung đột.`, line: 8 };
            }
        }
        yield { activities: [...activities], selected: [...selected], done: true, message: "Hoàn thành chọn hoạt động. Số hoạt động được chọn: " + selected.length };
    },

    renderer: (step, container) => {
        // Calculate summary stats
        const totalActivities = step.activities.length;
        const selectedCount = step.selected ? step.selected.length : 0;
        const efficiency = totalActivities > 0 ? Math.round((selectedCount / totalActivities) * 100) : 0;

        // Calculate conflicts
        const conflicts = [];
        for (let i = 0; i < step.activities.length; i++) {
            for (let j = i + 1; j < step.activities.length; j++) {
                const a = step.activities[i];
                const b = step.activities[j];
                if (!(a.end <= b.start || b.end <= a.start)) {
                    conflicts.push([a.index, b.index]);
                }
            }
        }

        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Danh sách hoạt động</div>
                <div id="activities-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Hoạt động đã chọn</div>
                <div id="selected-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Tóm tắt</div>
                <div id="summary-container" class="vis-element-container">
                    <div class="summary-item">Tổng hoạt động: ${totalActivities}</div>
                    <div class="summary-item">Đã chọn: ${selectedCount}</div>
                    <div class="summary-item">Hiệu suất: ${efficiency}%</div>
                </div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Xung đột</div>
                <div id="conflicts-container" class="vis-element-container"></div>
            </div>`;

        const activitiesContainer = container.querySelector('#activities-container');
        const selectedContainer = container.querySelector('#selected-container');
        const conflictsContainer = container.querySelector('#conflicts-container');

        // Populate activities list
        step.activities.forEach((act, idx) => {
            const div = document.createElement('div');
            div.className = 'activity-item';
            div.textContent = `A${act.index}: (${act.start},${act.end})`;
            if (step.current === idx) div.classList.add('highlight-i');
            if (step.selected?.includes(act.index)) div.classList.add('highlight-update');
            activitiesContainer.appendChild(div);
        });

        // Populate selected list
        if (step.selected) {
            step.selected.forEach(idx => {
                const act = step.activities.find(a => a.index === idx);
                const div = document.createElement('div');
                div.className = 'activity-item selected';
                div.textContent = `A${idx}: (${act.start},${act.end})`;
                selectedContainer.appendChild(div);
            });
        }

        // Populate conflicts list
        conflicts.forEach(([idx1, idx2]) => {
            const div = document.createElement('div');
            div.className = 'activity-item conflict';
            div.textContent = `A${idx1} ↔ A${idx2}`;
            conflictsContainer.appendChild(div);
        });
    }
};
