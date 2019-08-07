class AddTopicToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :topic, :text
  end
end
