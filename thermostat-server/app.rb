require 'sinatra/base'
require 'json'
# require_relative 'lib/thermostatModel'

class ThermostatServer < Sinatra::Base
  enable :sessions

  get '/' do
    "I am running"
  end

  get '/thermostat' do
    puts "inside gets /thermostat"
    headers 'Access-Control-Allow-Origin' => '*'
    File.read('thermostat_data.txt')
    # p data
    # # JSON.generate({
    # #   temp: session[:temp],
    # #   city: session[:city]
    # # })
    # "nice one"
  end

  post '/thermostat' do
    puts "inside post /thermostat"
    headers 'Access-Control-Allow-Origin' => '*'
    output = JSON.generate({
      city: params[:city],
      temp: params[:temp],
      powersaving: params[:powersaving],
    })
    session[:city] = params[:city]
    session[:temp] = params[:temp]
    session[:powersaving] = params[:powersaving]
    p session
    file = File.open('thermostat_data.txt', 'w')
    file.puts output
    file.close
    
    "thanks"
  end

end