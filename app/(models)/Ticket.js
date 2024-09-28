const ticketSchema = {
  title: String,
  description: String,
  categoryMonth: String,
  categoryQuarter: String,
  categoryYear: String,
  category: String,
  priority: Number,
  progress: Number,
  status: String,
  active: Boolean,
  type: String,
  screenshots: Array,
  hours: Number,
  actualCosts: Number,
  estimatedCosts: Number,
  link: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
};

let Ticket;

if (typeof window === 'undefined') {
  // We're on the server side
  const mongoose = require('mongoose');
  const schema = new mongoose.Schema(ticketSchema, { timestamps: true });

  // Update the method to calculate estimatedCosts
  schema.methods.calculateEstimatedCosts = function () {
    this.estimatedCosts = Math.round(this.hours * 1.3 * 140);
  };

  // Pre-save middleware to calculate estimatedCosts
  schema.pre('save', function (next) {
    this.calculateEstimatedCosts();
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    if (this._update.hours) {
      this._update.estimatedCosts = Math.round(this._update.hours * 1.3 * 140);
    }
    next();
  });

  Ticket = mongoose.models.Ticket || mongoose.model('Ticket', schema);
} else {
  // We're on the client side
  Ticket = function (data) {
    Object.assign(this, data);
  };
  Ticket.schema = ticketSchema;
}

export default Ticket;
