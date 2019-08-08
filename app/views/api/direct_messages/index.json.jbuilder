@dms.each do |dm|
    json.set! dm.id do
        json.partial! 'api/direct_messages/dm', dm: dm
    end
end
