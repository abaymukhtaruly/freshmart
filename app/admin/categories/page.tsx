import CategoryForm from "@/components/admin/CategoryForm";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
import { createCategory, updateCategory } from "@/actions/categories";

export const dynamic = "force-dynamic";
import { getCategories } from "@/lib/queries";

export default async function AdminCategoriesPage() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];

  try {
    categories = await getCategories();
  } catch {
    // DB not ready
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Категории</h1>

      <CategoryForm
        categories={categories}
        action={createCategory}
        submitLabel="Добавить"
      />

      <div className="mt-8 bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Название</th>
              <th className="text-left px-4 py-3 font-semibold">Родитель</th>
              <th className="text-left px-4 py-3 font-semibold">Товаров</th>
              <th className="text-right px-4 py-3 font-semibold">Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-muted">
                  Категорий пока нет
                </td>
              </tr>
            ) : (
              categories.map((category) => {
                const boundUpdate = updateCategory.bind(null, category.id);
                return (
                  <tr key={category.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{category.name}</td>
                    <td className="px-4 py-3 text-muted">{category.parent?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted">{category._count.products}</td>
                    <td className="px-4 py-3 text-right">
                      <details className="inline-block text-left">
                        <summary className="text-xs font-medium text-primary cursor-pointer hover:underline list-none">
                          Изменить
                        </summary>
                        <div className="mt-2 p-3 bg-background rounded-lg border border-border min-w-[280px]">
                          <CategoryForm
                            categories={categories}
                            category={category}
                            action={boundUpdate}
                            submitLabel="Сохранить"
                          />
                        </div>
                      </details>
                      <span className="mx-2 text-border">|</span>
                      <DeleteCategoryButton id={category.id} label={category.name} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
