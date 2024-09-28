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
  estimatedCosts: Number,
  actualCosts: Number,
};

let Ticket;

if (typeof window === 'undefined') {
  // We're on the server side
  const mongoose = require('mongoose');
  const schema = new mongoose.Schema(ticketSchema, { timestamps: true });
  Ticket = mongoose.models.Ticket || mongoose.model('Ticket', schema);
} else {
  // We're on the client side
  Ticket = function (data) {
    Object.assign(this, data);
  };
  Ticket.schema = ticketSchema;
}

export default Ticket;
