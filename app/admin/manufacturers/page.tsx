import ManufacturerForm from "@/components/admin/ManufacturerForm";
import DeleteRowButton from "@/components/admin/DeleteRowButton";
import {
  createManufacturer,
  deleteManufacturer,
  updateManufacturer,
} from "@/actions/manufacturers";
import { getManufacturers } from "@/lib/queries";

export default async function AdminManufacturersPage() {
  let manufacturers: Awaited<ReturnType<typeof getManufacturers>> = [];

  try {
    manufacturers = await getManufacturers();
  } catch {
    // DB not ready
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Производители</h1>

      <ManufacturerForm action={createManufacturer} submitLabel="Добавить" />

      <div className="mt-8 bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Название</th>
              <th className="text-left px-4 py-3 font-semibold">Описание</th>
              <th className="text-left px-4 py-3 font-semibold">Товаров</th>
              <th className="text-right px-4 py-3 font-semibold">Действия</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-muted">
                  Производителей пока нет
                </td>
              </tr>
            ) : (
              manufacturers.map((manufacturer) => {
                const boundUpdate = updateManufacturer.bind(null, manufacturer.id);
                return (
                  <tr key={manufacturer.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{manufacturer.name}</td>
                    <td className="px-4 py-3 text-muted">
                      {manufacturer.description ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted">{manufacturer._count.products}</td>
                    <td className="px-4 py-3 text-right">
                      <details className="inline-block text-left">
                        <summary className="text-xs font-medium text-primary cursor-pointer hover:underline list-none">
                          Изменить
                        </summary>
                        <div className="mt-2 p-3 bg-background rounded-lg border border-border min-w-[320px]">
                          <ManufacturerForm
                            manufacturer={manufacturer}
                            action={boundUpdate}
                            submitLabel="Сохранить"
                          />
                        </div>
                      </details>
                      <span className="mx-2 text-border">|</span>
                      <DeleteRowButton
                        label={manufacturer.name}
                        onDelete={() => deleteManufacturer(manufacturer.id)}
                      />
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
