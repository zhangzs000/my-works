/**
 * Timeout Interceptor.
 */

export default function (request, next) {

    var timeout

    if (request.timeout) {
        timeout = setTimeout(() => {
            request.abort()
            request.timeoutFunc && request.timeoutFunc.call(this, request)
        }, request.timeout)
    }

    next((response) => {
        clearTimeout(timeout)
    })
}
