const categoryBudgetSchema = {
  category: { type: String, required: true, unique: true },
  budgetType: {
    type: String,
    enum: ['month', 'quarter', 'year'],
    required: true,
  },
  budget: { type: Number, required: true, default: 0 },
};

let CategoryBudget;

if (typeof window === 'undefined') {
  // We're on the server side
  const mongoose = require('mongoose');
  const schema = new mongoose.Schema(categoryBudgetSchema, {
    timestamps: true,
  });
  CategoryBudget =
    mongoose.models.CategoryBudget || mongoose.model('CategoryBudget', schema);
} else {
  // We're on the client side
  CategoryBudget = function (data) {
    Object.assign(this, data);
  };
  CategoryBudget.schema = categoryBudgetSchema;
}

export default CategoryBudget;
