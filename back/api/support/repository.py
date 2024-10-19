class Repository():
    status =  [
        {
            'id': 0,
            'name': 'Kika',
            'age': 10,
            'breed': 'half breed',
            'passport': True,
            'chip': True
        }
    ]

    @staticmethod
    def show():

        return Repository.status

    @staticmethod
    def create(new_animal):
        Repository.status.append(new_animal)

    @staticmethod
    def destroy(animal_id):
        delted_animal = Repository.status.pop(animal_id)

        if not delted_animal: return None

        return delted_animal
        # Repository.status['data'].append(new_animal)