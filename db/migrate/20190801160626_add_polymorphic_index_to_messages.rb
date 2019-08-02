class AddPolymorphicIndexToMessages < ActiveRecord::Migration[5.2]
  def change
    add_index :messages, [:messageable_type, :messageable_id]
  end
end
