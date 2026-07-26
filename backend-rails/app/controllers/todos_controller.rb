class TodosController < ApplicationController
  def index
    render json: Todo.all
  end


  def create
    todo = Todo.new(todo_params)

    if todo.save
      render json: todo, status: :created
    else
      render json: { errors: todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    todo = Todo.find(params[:id])

    if todo.update(todo_params)
      render json: todo
    else
      render json: { errors: todo.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def destroy
    todo = Todo.find(params[:id])
    todo.destroy

    render json: { success: true }
  end


  private

  def todo_params
    params.permit(:title, :desc, :status)
  end
end
