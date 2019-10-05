let classes = {
  subscription: function (subscriber, subscribee, notification) {
    this.subscriber = subscriber;
    this.subscribee = subscribee;
    this.notification = notification;

  },
  promoted: function (content, promoter, promotee, requestDate, duration, cost, promotedDate) {
    this.content_id = content;
    this.promoter_id = promoter;
    this.promoted_by = promotee;
    this.duration = duration;
    this.request_date = requestDate;
    this.cost = cost;
    this.promoted_date = promotedDate
  }
}


