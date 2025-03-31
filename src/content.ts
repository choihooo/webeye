// 버튼 스타일
const buttonStyle = `
    .webeye-button {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.9);
        border: 1px solid #ccc;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        top: 50%;
        transform: translateY(-50%);
        left: -50px;
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
    }
    .webeye-button:hover {
        background-color: rgba(255, 255, 255, 1);
    }
    .webeye-image-container {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }
    .webeye-image-container:hover {
        outline: 2px solid #007bff;
    }
    .webeye-image-container.selected {
        outline: 2px solid #28a745;
    }
`;

// 이미지에 버튼 추가
function addButtonToImages() {
    const images = document.querySelectorAll(
        ".subType-IMAGE img, .subType-TEXT img",
    );

    images.forEach((img) => {
        if (!img.parentElement?.classList.contains("webeye-image-container")) {
            const container = document.createElement("div");
            container.className = "webeye-image-container";
            container.style.position = "relative";
            container.style.display = "inline-block";

            const button = document.createElement("button");
            button.className = "webeye-button";
            button.textContent = "분석";
            button.onclick = () => alert("이미지 분석 클릭!");

            // 이미지에 컨테이너 적용
            img.parentNode?.insertBefore(container, img);
            container.appendChild(img);
            container.appendChild(button);

            // 이미지 선택 이벤트
            container.addEventListener("click", (e) => {
                e.stopPropagation();
                const imgElement = img as HTMLImageElement;
                alert(`선택된 이미지 URL: ${imgElement.src}`);
            });

            // 초기 버튼 위치 설정
            updateButtonPosition(img as HTMLImageElement, button);

            // 이미지 로드 후 버튼 위치 업데이트
            const imgElement = img as HTMLImageElement;
            if (imgElement.complete) {
                updateButtonPosition(imgElement, button);
            } else {
                imgElement.onload = () =>
                    updateButtonPosition(imgElement, button);
            }

            // 스크롤 이벤트 리스너 추가
            window.addEventListener("scroll", () =>
                updateButtonPosition(imgElement, button),
            );
            window.addEventListener("resize", () =>
                updateButtonPosition(imgElement, button),
            );
        }
    });
}

// 버튼 위치 업데이트 함수
function updateButtonPosition(img: HTMLImageElement, button: HTMLElement) {
    const imgRect = img.getBoundingClientRect();
    const container = img.parentElement;

    if (container?.classList.contains("webeye-image-container")) {
        button.style.top = `${img.offsetTop + img.height / 2}px`;

        // 이미지가 화면에 보이는지 확인하고 버튼 표시/숨김 처리
        if (imgRect.top < window.innerHeight && imgRect.bottom > 0) {
            button.style.opacity = "1";
        } else {
            button.style.opacity = "0";
        }
    }
}

// 스타일 추가
if (!document.getElementById("webeye-button-style")) {
    const style = document.createElement("style");
    style.id = "webeye-button-style";
    style.textContent = buttonStyle;
    document.head.appendChild(style);
}

// 초기 실행
addButtonToImages();

// DOM 변경 감지 (새로운 이미지에도 적용)
const observer = new MutationObserver(addButtonToImages);
observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// 메시지 리스너 (버튼 토글)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleOverlay") {
        if (request.show) {
            addButtonToImages();
        } else {
            document
                .querySelectorAll(".webeye-image-container")
                .forEach((container) => {
                    const img = container.querySelector("img");
                    if (img) {
                        container.parentNode?.insertBefore(img, container);
                    }
                    container.remove();
                });
        }
        sendResponse({ success: true });
    }
});
