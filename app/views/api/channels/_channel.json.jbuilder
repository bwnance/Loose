json.extract! channel, :id, :topic, :title, :purpose, :created_at
json.user_ids do 
    json.array! channel.users.ids
end