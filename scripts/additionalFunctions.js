(function () {
    var tips = document.getElementById('tips'),
    tipsBtn = document.getElementById('tips-btn');
    tipsBtn.addEventListener('click', function () {
        if (tips.classList.contains('hidden')) {
            tips.classList.remove('hidden');

            if (newGame) {
                game.pause = true;
            }
        } else {
            tips.classList.add('hidden');

            if (newGame) {
                game.pause = false;
            }
        }
    });
    
    var closeTips = document.getElementById('closeTips');
    closeTips.addEventListener('click', function () {
        tips.classList.add('hidden');

        if (newGame) {
            game.pause = false;
        }
    });

    var gameStory = document.getElementById('game-story'),
        storyBtn = document.getElementById('story-btn');
    storyBtn.addEventListener('click', function () {

        if (gameStory.classList.contains('hidden')) {
            gameStory.classList.remove('hidden');
            if (newGame) {
                game.pause = true;
            }
        } else {
            gameStory.classList.add('hidden');
            if (newGame) {
                game.pause = false;
            }
        }
    });

    var closeStory = document.getElementById('closeStory');
    closeStory.addEventListener('click', function () {
        gameStory.classList.add('hidden');

        if (newGame) {
            game.pause = false;
        }
    });
})();