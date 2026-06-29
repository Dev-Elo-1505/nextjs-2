import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/db";

const TodoPage = async () => {
    await connectDB();
  return (
    <div>
      <Button>Click me</Button>
      
    </div>
  );
};

export default TodoPage;
