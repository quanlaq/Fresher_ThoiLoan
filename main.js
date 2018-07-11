cc.game.onStart = function(){
    cc.view.enableRetina(false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Set up the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.SHOW_ALL);
    // The game will be resized when browser size changes
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_preload, function () {
        cc.director.runScene(new MainLayer.scene());
    }, this);
};

cc.game.run();