const greedyTopics = [
    {
        id: 'gioi-thieu-tham-lam',
        category: 'tham-lam',
        title: 'Thuật toán Tham Lam (Greedy Algorithm) - Giới thiệu',
        content: `
            <h2>1. Thuật toán Tham Lam là gì?</h2>
            <p>Thuật toán tham lam (Greedy Algorithm) là một phương pháp giải quyết vấn đề bằng cách luôn chọn lựa chọn tối ưu cục bộ tại mỗi bước, với hy vọng rằng lựa chọn này sẽ dẫn đến giải pháp tối ưu toàn cục. Đây là một trong những kỹ thuật quan trọng trong lập trình thi đấu, đặc biệt khi giải quyết các bài toán tối ưu hóa.</p>

            <h2>2. Nguyên tắc hoạt động</h2>
            <p>- Tại mỗi bước, chọn lựa chọn tốt nhất hiện tại mà không xét đến tương lai.<br>
            - Thuật toán tham lam không đảm bảo luôn đúng, nhưng hiệu quả trong nhiều trường hợp cụ thể.<br>
            - Độ phức tạp thường thấp (O(n log n) hoặc tốt hơn).</p>

            <h2>3. Khi nào sử dụng thuật toán tham lam?</h2>
            <p>- Vấn đề có tính chất "tối ưu cục bộ dẫn đến tối ưu toàn cục" (greedy choice property).<br>
            - Có thể chứng minh được tính đúng đắn bằng phương pháp quy nạp hoặc đối nghịch.<br>
            - Ví dụ: Bài toán chọn hoạt động, tìm đường đi ngắn nhất trong đồ thị không có cạnh âm.</p>

            <h2>4. Ví dụ đơn giản: Chọn đồng xu</h2>
            <p>Cho các mệnh giá đồng xu và số tiền cần đổi, luôn chọn đồng xu lớn nhất có thể.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

vector<int> coinChange(vector<int> coins, int amount) {
    sort(coins.rbegin(), coins.rend()); // Sắp xếp giảm dần
    vector<int> result;
    for (int coin : coins) {
        while (amount >= coin) {
            result.push_back(coin);
            amount -= coin;
        }
    }
    return result;
}

int main() {
    vector<int> coins = {25, 10, 5, 1};
    int amount = 63;
    vector<int> change = coinChange(coins, amount);
    for (int c : change) cout << c << " ";
    // Output: 25 25 10 1 1 1
    return 0;
}
                </code></pre>
            </div>

            <h2>5. Lưu ý khi sử dụng</h2>
            <p>- Luôn chứng minh tính đúng đắn trước khi áp dụng.<br>
            - Nếu không chắc chắn, cân nhắc sử dụng DP hoặc brute force.<br>
            - Trong Olympic, thường kết hợp với sorting để đảm bảo thứ tự.</p>
        `
    },
    {
        id: 'chon-hoat-dong',
        category: 'tham-lam',
        title: 'Bài toán Chọn Hoạt động (Activity Selection Problem)',
        content: `
            <h2>1. Mô tả bài toán</h2>
            <p>Có n hoạt động, mỗi hoạt động có thời gian bắt đầu và kết thúc. Chọn tập hợp hoạt động lớn nhất sao cho không có hai hoạt động nào trùng nhau về thời gian.</p>

            <h2>2. Thuật toán tham lam</h2>
            <p>- Sắp xếp hoạt động theo thời gian kết thúc sớm nhất.<br>
            - Luôn chọn hoạt động kết thúc sớm nhất chưa bị loại.<br>
            - Loại bỏ các hoạt động xung đột với hoạt động đã chọn.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

struct Activity {
    int start, end;
};

bool compare(Activity a, Activity b) {
    return a.end < b.end;
}

vector<int> selectActivities(vector<Activity> activities) {
    sort(activities.begin(), activities.end(), compare);
    vector<int> selected;
    int lastEnd = -1;
    for (int i = 0; i < activities.size(); i++) {
        if (activities[i].start >= lastEnd) {
            selected.push_back(i);
            lastEnd = activities[i].end;
        }
    }
    return selected;
}

int main() {
    vector<Activity> activities = {
        {1, 3}, {2, 4}, {3, 5}, {0, 6}, {5, 7}, {8, 9}, {5, 9}
    };
    vector<int> selected = selectActivities(activities);
    for (int idx : selected) {
        cout << "Activity " << idx << ": (" << activities[idx].start << ", " << activities[idx].end << ")" << endl;
    }
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Tại sao thuật toán đúng?</h2>
            <p>- Chứng minh bằng quy nạp: Giả sử có giải pháp tối ưu S, thuật toán chọn hoạt động kết thúc sớm nhất trong S.<br>
            - Thay thế hoạt động đó bằng hoạt động kết thúc sớm nhất, vẫn tối ưu.</p>

            <h2>4. Độ phức tạp</h2>
            <p>- Sắp xếp: O(n log n)<br>
            - Duyệt: O(n)<br>
            - Tổng: O(n log n)</p>

            <h2>5. Ứng dụng trong Olympic</h2>
            <p>- Lập lịch công việc, quản lý tài nguyên.<br>
            - Thường kết hợp với interval scheduling problems.</p>
        `
    },
    {
        id: 'bai-toan-tui-do',
        category: 'tham-lam',
        title: 'Bài toán Túi đồ Phân số (Fractional Knapsack)',
        content: `
            <h2>1. Mô tả bài toán</h2>
            <p>Có n đồ vật, mỗi đồ vật có trọng lượng và giá trị. Túi có sức chứa W. Tìm cách chọn đồ vật (có thể lấy một phần) để tối đa hóa giá trị, với tổng trọng lượng ≤ W.</p>

            <h2>2. Thuật toán tham lam</h2>
            <p>- Tính tỷ lệ giá trị/trọng lượng cho mỗi đồ vật.<br>
            - Sắp xếp theo tỷ lệ giảm dần.<br>
            - Lấy đồ vật có tỷ lệ cao nhất, lấy toàn bộ hoặc một phần nếu cần.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

struct Item {
    int value, weight;
    double ratio;
};

bool compare(Item a, Item b) {
    return a.ratio > b.ratio;
}

double fractionalKnapsack(vector<Item> items, int W) {
    for (auto&amp; item : items) {
        item.ratio = (double)item.value / item.weight;
    }
    sort(items.begin(), items.end(), compare);
    double totalValue = 0.0;
    for (auto item : items) {
        if (W >= item.weight) {
            totalValue += item.value;
            W -= item.weight;
        } else {
            totalValue += item.value * ((double)W / item.weight);
            break;
        }
    }
    return totalValue;
}

int main() {
    vector<Item> items = {
        {60, 10}, {100, 20}, {120, 30}
    };
    int W = 50;
    cout << "Maximum value: " << fractionalKnapsack(items, W) << endl;
    // Output: 240 (60 + 100 + 120*(20/30))
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Tại sao đúng?</h2>
            <p>- Tỷ lệ giá trị/trọng lượng quyết định mức độ "hiệu quả" của đồ vật.<br>
            - Luôn chọn đồ vật hiệu quả nhất trước.</p>

            <h2>4. Lưu ý</h2>
            <p>- Chỉ áp dụng khi có thể lấy một phần đồ vật (fractional).<br>
            - Nếu không thể chia nhỏ (0/1 knapsack), cần dùng DP.</p>
        `
    },
];

module.exports = greedyTopics;
