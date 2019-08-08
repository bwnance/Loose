class CreateDmMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :dm_memberships do |t|
      t.integer :user_id, null: false
      t.integer :dm_id, null: false

      t.index :user_id
      t.index :dm_id
      t.index [:user_id, :dm_id], unique: true
      t.timestamps
    end
  end
end
