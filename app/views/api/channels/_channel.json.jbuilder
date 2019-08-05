json.extract! channel, :id, :title, :purpose
json.user_ids do 
    json.array! channel.users.ids
end