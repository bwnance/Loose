class AddPurposToChannel < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :purpose, :string
  end
end
