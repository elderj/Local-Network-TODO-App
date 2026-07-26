class Todo < ApplicationRecord
    self.table_name = "todos"
    self.record_timestamps = false
end
