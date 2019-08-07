class AddIsAutoMessageToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :is_auto_message, :boolean, null: false
  end
end
