import * as $ from 'jquery';

function createAnalytics(): object {
    let counter = 0;
    let destroyed: boolean = false;
    const listener = (): number => counter++;

    $(document).on('click', listener);

    return {
        destroy() {
            $(document).off('click', listener);
            destroyed = true;
        },

        getClicks() {
            if (destroyed) {
                return 'Is Destroyed';
            }
            return counter;
        }
    }
}

window['analytics'] = createAnalytics();