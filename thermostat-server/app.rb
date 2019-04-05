require 'sinatra/base'
require 'json'

class Server < Sinatra::Base
  enable :sessions

  get '/' do
    puts "inside route"
    "This is the route"
  end

  get '/thermostat' do
    puts "inside gets /thermostat"
    headers 'Access-Control-Allow-Origin' => '*'
    content_type :json
    p session
    { city: session[:city],
      temp: session[:temp] }.to_json
  end

  post '/thermostat' do
    puts "inside post /thermostat"
    headers 'Access-Control-Allow-Origin' => '*'
    content_type :json
    session[:city] = params[:city]
    session[:temp] = params[:temp]
    p session
    "Hello from the server"
  end


end