require 'data_mapper'

class Thermostat
  include DataMapper::Resource

  property :id,          Serial
  property :city,        String
  property :powersaving, String
  property :temp,        String
end
