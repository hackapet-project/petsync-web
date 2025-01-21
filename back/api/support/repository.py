from api.models import Animal
from django.core.serializers import serialize

class Repository():

    @staticmethod
    def show():
        query = Animal.objects.all()
        json_data = serialize('json', query)
        return json_data

    @staticmethod
    def create(new_animal):
        Repository.data.append(new_animal)

    @staticmethod
    def destroy(animal_id):
        delted_animal = Repository.data.pop(animal_id)

        if not delted_animal: return None

        return delted_animal
        # Repository.data['data'].append(new_animal)