json.errors do 
    @errors.keys.uniq.each do |k|
        json.set! k do 
            json.array! @errors[k]
        end
    end
end