
const gamepad = (()=>{

    // simple mapping for xbox compatible gamepad
    const buttonsMapping = {
        up: 12,
        down: 13,
        right: 15,
        left: 14,
        shoot: 0,
        reset: 8,
    }
    let currentGamepad = null
    let waitForAnyKeyInterval

    function init() {
        window.addEventListener('gamepadconnected', (event) => {
            currentGamepad = event.gamepad
        });

        window.addEventListener('gamepaddisconnected', (event) => {
            currentGamepad = null
        });
    }

    function update(keyStates) {
        if (!currentGamepad) return false;
        for (let key in buttonsMapping) {
            keyStates[key] = currentGamepad.buttons[buttonsMapping[key]].pressed;
        }
    }

    function dontWaitForAnyKey() {
        if (waitForAnyKeyInterval) clearInterval(waitForAnyKeyInterval)
        waitForAnyKeyInterval = undefined
    }
    function waitForAnyKey(callback) {
        if (waitForAnyKeyInterval) dontWaitForAnyKey()

        waitForAnyKeyInterval = setInterval(()=>{
            if (!currentGamepad) return
            if (currentGamepad.buttons.find(button=>button.pressed)) {
                dontWaitForAnyKey()
                callback()
            }
        }, 50)
    }

    function dbg() {
        setInterval(()=>{
            let pressed = currentGamepad.buttons.map((b,i)=>{b.id=i; return b}).filter(button=>button.pressed)
            if (pressed.length) console.log(pressed)
        }, 50)
    }

    init()

    return {update, waitForAnyKey, dontWaitForAnyKey, dbg}

})()