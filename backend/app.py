from flask import Flask, jsonify, request

from flask_cors import CORS

from textblob import TextBlob

app = Flask(__name__)
CORS(app)


@app.route("/")
def home_view():
    return "<h1>Welcome to the backend!</h1>"


@app.route("/fedrate", methods=["POST"])
def get_fed_fund_rate():
    txt = request.get_json()

    fedFund = sentiment_analysis(txt["beigeText"], txt["speechText"])
    return jsonify(fedFund), 201


def sentiment_analysis(beigeText, speechText):
    BeigeBook = TextBlob(beigeText)

    bPolarity = BeigeBook.sentiment.polarity
    bSubjectivity = BeigeBook.sentiment.subjectivity

    print(bPolarity)

    print(bSubjectivity)

    GovernorsSpeeches = TextBlob(speechText)

    gPolarity = GovernorsSpeeches.sentiment.polarity
    gSubjectivity = GovernorsSpeeches.sentiment.subjectivity

    print(gPolarity)

    print(gSubjectivity)

    FedFundPredicted = (
        -0.0305
        + 0.7250 * BeigeBook.sentiment.polarity
        - 0.3938 * BeigeBook.sentiment.subjectivity
        + 0.2882 * GovernorsSpeeches.sentiment.polarity
        + 0.2772 * GovernorsSpeeches.sentiment.subjectivity
    )

    return [FedFundPredicted, bPolarity, bSubjectivity, gPolarity, gSubjectivity]


if __name__ == "__main__":
    app.run()
