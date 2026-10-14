function renderDialogueSequence(sequence, container) {
    let index = 0;

    function renderNext() {
        if (index >= sequence.length) return;

        const item = sequence[index];
        index++;

        if (item.type === "choices") {
            const choiceContainer = document.createElement('div');
            choiceContainer.className = 'choice-container';

            // Tạo một khu vực riêng biệt để chứa hội thoại phản hồi tương ứng với lựa chọn
            const responseArea = document.createElement('div');
            responseArea.className = 'response-area';

            item.options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = option.text;

                btn.onclick = function() {
                    // Bỏ trạng thái selected của tất cả các nút trong nhóm, rồi gán cho nút được bấm
                    const allButtons = choiceContainer.querySelectorAll('.choice-btn');
                    allButtons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');

                    // Xóa phản hồi cũ trong responseArea nếu người dùng đổi ý chọn option khác
                    responseArea.innerHTML = "";

                    // Hiển thị lựa chọn của người dùng lên màn hình (tùy chọn: có thể hiện hoặc bỏ qua phần này tùy ý)
                    // Ở đây ta hiển thị thẳng đoạn thoại phản hồi của nhánh đó vào responseArea
                    if (option.next) {
                        let subIndex = 0;
                        function renderSubNext() {
                            if (subIndex >= option.next.length) return;
                            const subItem = option.next[subIndex];
                            subIndex++;

                            appendDialogueBubble(subItem, responseArea);
                            container.scrollTop = container.scrollHeight;

                            setTimeout(renderSubNext, 200); // Độ trễ 200ms giữa các câu thoại con
                        }
                        renderSubNext();
                    }
                };

                choiceContainer.appendChild(btn);
            });

            container.appendChild(choiceContainer);
            container.appendChild(responseArea); // Gắn vùng phản hồi ngay dưới cụm nút lựa chọn
            container.scrollTop = container.scrollHeight;
        } else {
            appendDialogueBubble(item, container);
            setTimeout(renderNext, 200);
        }
    }

    renderNext();
}

function appendDialogueBubble(item, container) {
    const isYou = item.speaker.toLowerCase() === 'you';
    
    const row = document.createElement('div');
    row.className = `chat-row ${isYou ? 'right' : 'left'}`;

    if (!isYou) {
        const avatarFileName = item.speaker.toLowerCase().replace(/\s+/g, '-');
        const img = document.createElement('img');
        img.className = 'avatar';
        img.src = `images/${avatarFileName}.png`;
        img.onerror = function() {
            this.src = 'images/default.png';
        };
        row.appendChild(img);
    }

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'speaker-name';
    nameDiv.innerText = item.speaker.toUpperCase();

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.innerText = item.text;

    bubble.appendChild(nameDiv);
    bubble.appendChild(textDiv);
    row.appendChild(bubble);

    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
}

function startAct(actData) {
    const container = document.getElementById('dialogue-container');
    container.innerHTML = "";
    renderDialogueSequence(actData, container);
}