let subscribers = {}

export function subscribe(eventName, callback) {
  if (subscribers[eventName] === undefined) {
    subscribers[eventName] = []
  }

  subscribers[eventName] = [...subscribers[eventName], callback]

  return function unsubscribe() {
    subscribers[eventName] = subscribers[eventName].filter((cb) => {
      return cb !== callback
    })
  }
}

export function publish(eventName, data) {
  if (subscribers[eventName]) {
    subscribers[eventName].forEach((callback) => {
      callback(data)
    })
  }
}

export const EVENTS = {
  cartBeforeChange: "cart:before-change",
  cartChange: "cart:change",
  cartError: "cart:error",
  lineItemChange: "line-item:change",
  variantChange: "variant:change"
}
