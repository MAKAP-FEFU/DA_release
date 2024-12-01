from Levenshtein import distance as lev_distance
import numpy as np

class MatchingService:

    def preprocess_name(self, name):
        return name.lower().strip()

    def similarity_score(self, name1, name2):
        name1 = self.preprocess_name(name1)
        name2 = self.preprocess_name(name2)
        return 1 - lev_distance(name1, name2) / max(len(name1), len(name2))

    def compare_lists(self, list1, list2):
        results = []
        for name1 in list1:
            for name2 in list2:
                score = self.similarity_score(self.preprocess_name(name1), self.preprocess_name(name2))
                results.append(score)
        return results


    def match(self, model, source):
        field_names_model = model['properties'].keys()
        field_names_source = source['properties'].keys()

        similarity_matrix = np.zeros((len(field_names_model), len(field_names_source)))


        for i, field in enumerate(field_names_model):
            model_values = model['properties'][field]
            for j, source_field in enumerate(field_names_source):
                source_values = source['properties'][source_field]
                
                if model_values['type'] == source_values['type']:
                    if model_values['type'] == 'dict':
                        child_similarity_matrix = self.match(model_values, source_values)
                        print(child_similarity_matrix)
                        similarity_matrix[i, j] = np.average([child_similarity_matrix[i, i] for i in range(len(child_similarity_matrix) - 1)])
                    else:
                        similarity_matrix[i, j] = self.similarity_score(field, source_field)


        model_field_names = list(model['properties'].keys())
        source_field_names = list(source['properties'].keys())
        

        dct = dict()
        for i in range(len(model_field_names)):
            j = similarity_matrix[i].argmax()
            dct[model_field_names[i]] = source_field_names[j]

        return dct