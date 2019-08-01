class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.integer :sender_id, null: false
      t.integer :messageable_id, null: false #channel/dm id
      t.string :messageable_type, null: false #CHANNEL or DM
      t.integer :parent_id
      t.text :body, null: false

      t.index :sender_id
      t.index :messageable_id
      t.index :parent_id

      t.timestamps
    end
  end
end
