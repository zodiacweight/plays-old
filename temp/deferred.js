/**
 * @return promise
 */
function getPromise(limit) {
    var defer = $.Deferred(); // установка статуса задачи
    var cnt = 0, intrvl = setInterval(
        function () {
            cnt++;
            if (cnt >= limit) { // 5
                console.log('go resolve, cnt = ', cnt);
                clearInterval(intrvl);
                cnt = 0;
                defer.resolve(cnt);
            }
            if (cnt > 50) { //51 limit всегда больше cnt. cnt перерастает 50, limit все равно больше.
                console.warn('go reject, cnt = ', cnt);
                clearInterval(intrvl);
                defer.reject('Something went wrong');
            }
        }, 100);

    return defer.promise();
}
function getResult(limit) {
    getPromise(limit).then(
        function (result) {
            console.log('It works! Cnt = ', result);
        }, function (rejectMess) {
            console.warn(rejectMess);
        });
}