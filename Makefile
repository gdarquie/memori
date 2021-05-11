start s:
	docker-compose up -d

stop:
	docker-compose stop

php-sh:
	docker-compose run php sh

psql:
	docker-compose run database sh

ps:
	docker-compose ps

stop-all k:
	sudo service mysql stop && sudo service apache2 stop

log logs:
	docker-compose logs

prune-all prune:
	docker system prune -a

test t:
	docker-compose exec php bin/phpunit

