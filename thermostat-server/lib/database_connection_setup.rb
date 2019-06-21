require 'data_mapper'

DataMapper.setup(:default, 'postgres://student:password@localhost/thermostat')

DataMapper.finalize
DataMapper.auto_upgrade!
