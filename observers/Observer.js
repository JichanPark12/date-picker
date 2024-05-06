class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observerToRemove) {
    this.observers = this.observers.filter((fn) => fn !== observerToRemove);
  }

  notify(value) {
    this.observers.forEach((observer) => {
      observer.update(value);
    });
  }
}
export default Observer;
