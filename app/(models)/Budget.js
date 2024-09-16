import mongoose, { Schema } from 'mongoose';

const categoryBudgetSchema = new Schema(
  {
    category: { type: String, required: true, unique: true },
    budget: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const CategoryBudget =
  mongoose.models.CategoryBudget ||
  mongoose.model('CategoryBudget', categoryBudgetSchema);
export default CategoryBudget;
