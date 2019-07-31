module ApplicationHelper
    def is_email?(email)
        !!(email =~ /^.+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/)
    end
end
