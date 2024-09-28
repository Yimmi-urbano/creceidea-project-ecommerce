// /pages/index.tsx
import CategoryList from "@/components/category/CategoryList";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Category Management</h1>
      <CategoryList />
    </div>
  );
};

export default HomePage;
